export class ServerSideDatasource {

    constructor(private service) { }

    getRows(params) {
        console.log('getRows ->', params);
        this.service.getRows(JSON.stringify({ ...params.request })).subscribe(response => params.success({
            rowData: response.rows,
            rowCount: response.lastRow
        }))
    }

    getSetFilterValues(params, field) {
        this.service.getValues(field).subscribe(response => params.success(response));
    }

}
