import { Injectable } from "@angular/core"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"

@Injectable()
export class PrintHtmlService {

    printHtml(printContents) {
        let popupWin;
        //printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
                table{
                    border:solid;
                }
                td{
                padding: 3px;
                border-style: solid;
                border-width: thin;
                width: 14vw;
                text-align: center;
                }
                .headerTableReport{
                    font-weight:bold;
                }
                .ToShow{
                    text-align:center;      
                   margin:1vw;
                }
            </style>
        </head>
        <body onload="window.print();window.close()">${printContents.innerHTML}</body>

      </html>`
        );
        popupWin.document.close();
    }
}