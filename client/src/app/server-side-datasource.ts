import { Injectable } from "@angular/core";
import { OlympicWinnersService } from "./olympic-winners.service";

@Injectable({
    providedIn: 'root'
})
export class ServerSideDatasource {

    constructor(private olympicWinnersService: OlympicWinnersService) { }

    getRows(params) {
        console.log('getRows ->', params);
        this.olympicWinnersService.getRows(JSON.stringify({ ...params.request })).subscribe(response => params.success({
            rowData: response.rows,
            rowCount: response.lastRow
        }))
    }

    getSetFilterValues(params, field) {
        this.olympicWinnersService.getValues(field).subscribe(response => params.success(response));

    }

}
