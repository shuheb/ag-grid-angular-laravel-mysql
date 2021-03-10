import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import { OlympicWinnersService } from "./olympic-winners.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public rowData;
  public rowModelType;
  public serverSideStoreType;
  public paginationPageSize;
  public autoGroupColumnDef;

  constructor(private olympicWinnersService: OlympicWinnersService) {

    this.columnDefs = [
      {
        field: 'athlete',
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
          }
        }
      },
      {
        field: 'age', filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
          }
        },
      },
      {
        field: 'country',
        enableRowGroup: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: params => {
            const field = params.colDef.field;
            this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
          }
        }
      },
      { field: 'year', enableRowGroup: true },
      { field: 'date', sortable: false },
      { field: 'sport' },
      { field: 'gold', enableValue:true, aggFunc: 'sum', allowedAggFuncs:['avg','count','sum','min','max']},
      { field: 'silver', enableValue:true, aggFunc: 'sum', allowedAggFuncs:['avg','count','sum','min','max'] },
      { field: 'bronze', enableValue:true, aggFunc: 'sum', allowedAggFuncs:['avg','count','sum','min','max'] },
      { field: 'total', enableValue:true, aggFunc: 'sum', allowedAggFuncs:['avg','count','sum','min','max'] },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      floatingFilter: true,
      sortable: true
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.rowData = [];
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 250,
      field: 'country',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: params => {
          const field = params.colDef.field;
          this.olympicWinnersService.getValues(field).subscribe(values => params.success(values));
        }
      }
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = {
      getRows: params => {
        console.log('[Datasource] - rows requested by grid: startRow = ' + params.request.startRow + ', endRow = ' + params.request.endRow);

        // if filtering on group column, then change the filterModel key to have country as key
        if (params.request.filterModel['ag-Grid-AutoColumn']) {
          params.request.filterModel['country'] = params.request.filterModel['ag-Grid-AutoColumn'];
          delete params.request.filterModel['ag-Grid-AutoColumn'];
        }

        this.olympicWinnersService.getAthletes(JSON.stringify({ ...params.request })).subscribe(response => params.success({
          rowData: response.rows,
          rowCount: response.lastRow
        }))
      }
    }

    // setting the datasource, the grid will call getRows to pass the request
    params.api.setServerSideDatasource(datasource);
  }

}
