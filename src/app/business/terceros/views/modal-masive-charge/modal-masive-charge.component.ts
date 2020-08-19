import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { Tercero } from '../../terceros.models';
import { DatePipe, formatDate } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { API_TER_POST_FINDMASSIVE_SUPPLIER, API_TER_SUPPLIER } from '../../../../../app/services/url.constants';
import Swal from 'sweetalert2';
import { LoaderSubjectService } from '../../../../../app/commons/components/loader/loader-subject.service';
const SHEET_NAME = 'Hoja1';
@Component({
  selector: 'tdp-modal-masive-charge',
  templateUrl: './modal-masive-charge.component.html',
  styleUrls: ['./modal-masive-charge.component.scss']
})
export class ModalMasiveChargeComponent implements OnInit {

  /* @BlockUI() blockUI: NgBlockUI; */
  result: boolean = false;
  company_id;
  // EXCEL VARS
  SHEET_NAME = 'Hoja1';
  hojaDatos: Tercero[] = [];
  errors: string[] = [];
  @ViewChild('fileinput') inputfile_excel;
  suppliersCompanyService: Array<any> = [];
  condition_service = false;
  id_service: any;
  constructor(
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public dat: any,
    public http: HttpClient,
    public dialogRef: MatDialogRef<ModalMasiveChargeComponent>,
    private token: any,
    public ref: ChangeDetectorRef,
    private loaderSubjectService: LoaderSubjectService) {
    this.company_id = this.dat.idCompany;
  }

  ngOnInit() {
    this.suppliersCompanyService = this.dat.supplierOption;
    this.id_service = this.dat.idService;
    if (this.dat.idService != 0) {
      this.condition_service = true;
      this.ref.detectChanges();
    }

  }
  closeModal(): void {
    this.dialogRef.close();
  }
  findByNationalId(request) {
    let json = {
      "supp": request
    }
    return this.http.post(API_TER_POST_FINDMASSIVE_SUPPLIER, json, {})
  }
  saveCorrects() {
    if (this.id_service == 0) {
      Swal.fire({
        icon: 'error',
        html: "Necesita seleccionar el servicio al cual se asignaran los usuarios."
      })
    } else {
      const user_id = this.token.getDatoFromToken().user.id;
      let request: { supplier: Tercero, user_id: number, type: string, typeAction: any }[] = [];
      this.hojaDatos.forEach(element => {
        element.idCompany = this.id_service;
        request.push({
          supplier: element,
          user_id: user_id,
          type: "sup",
          typeAction: "M"
        })
      });
      this.findByNationalId(request).subscribe(resp => {
        if (resp["status"] == 1) {
          /* this.blockUI.start("Ingresando...") */
          this.loaderSubjectService.showLoader("Ingresando..");
          this.http.post(API_TER_SUPPLIER, request).toPromise().then(resp => {
            /* this.blockUI.stop(); */
            this.loaderSubjectService.closeLoader();
            if (resp['status'] == 1) {
              Swal.fire({
                icon: 'success',
                text: "Creación exitosa",
              })
              this.result = true;
            } else {
              Swal.fire({
                icon: 'error',
                html: "<b>" + resp["errors"] + "</b>"
              })
            }
            this.dialogRef.close();
          })
        } else {
          Swal.fire({
            icon: 'error',
            html: "<b>" + resp["errors"] + "</b>"
          })
        }
      })

      //this.dialogRef.close();
    }

  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    let headers: any[] = [];
    const reader = new FileReader();
    const file = ev.target.files[0];
    // Leer el libro excel cargado
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary', cellDates: true, cellNF: false, cellText: false });
      // Validar el libro
      if (workBook.SheetNames.includes(SHEET_NAME)) {
        const sheet = workBook.Sheets[SHEET_NAME];
        headers = this.get_header_row(sheet);
        jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true, dateNF: "YYYY-MM-DD" });
        // CORRECCIÓN Y VALIDACIÓN DE DATA:
        jsonData.forEach((row, idx) => {

          if (row.DNI && row.DNI != "") {
            // VALIDACIÓN DE OBLIGATORIOS
            if (row.DNI.length < 8)
              this.errors.push("Columna " + (idx + 2) + ": El documento de identidad debe tener al menos 8 digitos")
            else if (!row.CORREO)
              this.errors.push("Columna " + (idx + 2) + ": Correo es obligatorio")
            else if (!row.NOMBRE)
              this.errors.push("Columna " + (idx + 2) + ": Nombre es obligatorio")
            else if (!row.APELLIDO1 || !row.APELLIDO2)
              this.errors.push("Columna " + (idx + 2) + ": Apellidos son obligatorios")
            else if (row.GENERO && !(row.GENERO == "M" || row.GENERO == "F"))
              this.errors.push("Columna " + (idx + 2) + ": Genero solo puede ser M o F")
            else if (row.NACIMIENTO && isNaN(row.NACIMIENTO))
              this.errors.push("Columna " + (idx + 2) + ": Fecha de nacimiento debe ser formato fecha")
            else

              this.hojaDatos.push({
                activity: row.ACTIVIDAD ? row.ACTIVIDAD : '',
                birthdate: row.NACIMIENTO ? this.datePipe.transform(row.NACIMIENTO, 'yyyy-MM-dd') : '',
                codeCompany: row.CODIGO ? row.CODIGO : '',
                gender: row.GENERO ? row.GENERO : '',
                mail: row.CORREO,
                name: row.NOMBRE,
                lastName1: row.APELLIDO1 ? row.APELLIDO1 : '',
                lastName2: row.APELLIDO2 ? row.APELLIDO2 : '',
                nationalId: row.DNI,
                statusDetail: "",
                coronaStatus: 1,
                idCompany: this.company_id
              })
          }
        });
        if (this.hojaDatos.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error en el libro',
            html: 'No se encontró data en este libro.'
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el libro',
          html: 'No se encontró la hoja <b>' + SHEET_NAME + '</b>.'
        })
      }
    }
    reader.readAsBinaryString(file);
  }
  //VALIDACIONES
  ExcelDateToJSDate(date) {
    const exldate = new Date(Math.round((date - 25569) * 86400 * 1000))
    var strdate = formatDate(exldate, 'yyyy-MM-dd', 'en-US');
    return strdate;
  }
  // EXCEL HANLDER
  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]

      /* find the cell in the first row */
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t)
        hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
    }
    return headers;
  }

}
