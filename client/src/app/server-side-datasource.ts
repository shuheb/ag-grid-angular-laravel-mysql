export class ServerSideDatasource {

    constructor(private service) { }

    getRows(params) {
        
        if(params.request.filterModel['ag-Grid-AutoColumn']) {
            params.request.filterModel['country'] = params.request.filterModel['ag-Grid-AutoColumn'];
            delete params.request.filterModel['ag-Grid-AutoColumn'];
        }
        this.service.getRows(JSON.stringify({ ...params.request })).subscribe(response => params.success({
            rowData: response.rows,
            rowCount: response.lastRow
        }))
    }

    getSetFilterValues(params, field) {
        this.service.getValues(field).subscribe(response => params.success(response));
    }

}
