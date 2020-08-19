import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
/*no olvidar descomentar esta linea import { SignaturePad } from 'angular2-signaturepad/signature-pad'; */
@Component({
  selector: 'tdp-modal-sign',
  templateUrl: './modal-sign.component.html',
  styleUrls: ['./modal-sign.component.scss']
})
export class ModalSignComponent implements OnInit {
  flagSign:boolean = false;
  blobData:Blob;
  base64data;
 /*no olvidar descomentar esta linea  @ViewChild(SignaturePad) signaturePad: SignaturePad; */
  
 
  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
  };

  constructor(public dialogRef:MatDialogRef<ModalSignComponent>) { }

  ngAfterViewInit() {
    /* no olvidar descomentar esta linea this.signaturePad.set('minWidth', 2); 
    this.signaturePad.set('penColor',"#323232");
    this.signaturePad.clear();  */
  }
 

  ngOnInit() {
  }


  // SIGNATURE FUNCTIONS 
  clearSign(){
    /*no olvidar descomentar esta linea this.signaturePad.clear();  */
  }
  closeModal(){    
    this.dialogRef.close();
  }
  saveSign(){
    //this.blobData = this.convertBase64ToBlobData( this.signaturePad.toDataURL().split(",")[1] );
    /*no olvidar descomentar esta linea this.base64data =  this.signaturePad.toDataURL(); */

    /* if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, "FIRMA.png");
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = "firma.png";
      link.click();
    } */
    this.flagSign = true; 
    this.dialogRef.close();
  }
  drawComplete() {
  } 
  drawStart() {
  }
  // BASE 64 A BLOB
  convertBase64ToBlobData(base64Data: string, contentType: string='image/png', sliceSize=512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
