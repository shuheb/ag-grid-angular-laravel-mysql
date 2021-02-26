export class ServerSideDatasource {

    constructor(private service) { }

    getRows(params) {
        // if filtering on group column, then change the filterModel key to have country as key
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
