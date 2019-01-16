var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var apiUrl = "http://localhost:8080/losjueves/api";
var LosjuevesApiService = /** @class */ (function () {
    function LosjuevesApiService(http) {
        this.http = http;
    }
    LosjuevesApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    LosjuevesApiService.prototype.extractData = function (res) {
        var body = res;
        console.log(res);
        return body || {};
    };
    LosjuevesApiService.prototype.getGameTable = function () {
        var url = apiUrl + "/games/table";
        return this.http.get(url, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
    };
    LosjuevesApiService.prototype.getGameTableById = function (id) {
        var url = apiUrl + "/games/table/" + id;
        return this.http.get(url, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
    };
    LosjuevesApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], LosjuevesApiService);
    return LosjuevesApiService;
}());
export { LosjuevesApiService };
//# sourceMappingURL=losjueves-api.service.js.map