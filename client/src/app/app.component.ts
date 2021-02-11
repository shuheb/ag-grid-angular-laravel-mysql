import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import { ServerSideDatasource } from "./server-side-datasource";
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
  public datasource: ServerSideDatasource;

  constructor(private olympicWinnersService: OlympicWinnersService) {

    this.datasource = new ServerSideDatasource(olympicWinnersService);

    this.columnDefs = [
      { headerName: 'ID', field: 'id', maxWidth: 75 },
      {
        field: 'athlete',
        filter: 'agSetColumnFilter',
        filterParams: {
          values: this.getValuesAsync.bind(this)
        }
      },
      { field: 'age', maxWidth: 80 },
      {
        field: 'country',
        rowGroup: true,
        hide: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          values: this.getValuesAsync.bind(this)
        }
      },
      { field: 'year', maxWidth: 90 },
      { field: 'date' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.rowData = [];
    this.paginationPageSize = 10;
    this.autoGroupColumnDef = {
      headerName: 'Group',
      minWidth: 250,
      field: 'country',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: this.getValuesAsync.bind(this)
      }
    }
  }

  // generic function to call datasource to get the set filter values for a given column
  getValuesAsync(params) {
    const field = params.colDef.field;
    this.datasource.getSetFilterValues(params, field);
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // setting the datasource, the grid will call getRows to pass the request
    params.api.setServerSideDatasource(this.datasource);

  }

}
