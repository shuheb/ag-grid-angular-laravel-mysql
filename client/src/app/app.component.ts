import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise'
import { AthleteService} from "./athlete.service";
import { Athlete } from './athlete';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  private gridApi;
  private gridColumnApi;

  
   columnDefs;
   defaultColDef;
   rowData;
    rowModelType;
   serverSideStoreType;
   paginationPageSize;
   

  constructor(private athleteService:AthleteService) {
    this.columnDefs = [
      {field:'id'},
      {
        field: 'athlete',
        minWidth: 150,
      },
      {
        field: 'age',
        maxWidth: 90,
      },
      {
        field: 'country',
        minWidth: 150,
      },
      {
        field: 'year',
        maxWidth: 90,
      },
      {
        field: 'date',
        minWidth: 150,
      },
      {
        field: 'sport',
        minWidth: 150,
      },
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
    this.paginationPageSize= 250;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   

    const datasource = {
      getRows: (params) => {
          console.log(params.request);
          this.athleteService.getAthletes(JSON.stringify({...params.request})).subscribe(data=> 
            params.success({
                  rowData: data.rows,
                  rowCount: data.lastRow
              })
          )
      }

  };

  params.api.setServerSideDatasource(datasource);
    
  }
}
