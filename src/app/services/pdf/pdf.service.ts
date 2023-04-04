import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { GlobalConstants } from 'src/app/common/global-constants';
import { TokenService } from '../token/token.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private toastr: ToastrService, private http: HttpClient, private token: TokenService) { }

  generatePdf(sub: any, current_date: string | null) {

    const doc = new jsPDF()
    doc.setFont('Arial', 'normal');

    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


    const tableData: any[] = [];
    sub.forEach((obj: any, index: number) => {
      const row = [];
      row.push(index + 1);
      row.push(obj.fname);
      row.push(obj.phone);
      row.push(obj.sexe);
      row.push(obj.age);
      row.push(obj.ville);
      row.push(obj.program);
      row.push(obj.diplome);
      row.push(obj.center);
      tableData.push(row);
    });

    doc.setFontSize(18);

    doc.text('Réponses aux formulaire - ' + current_date, pageWidth / 2, 10, { align: 'center' });

    doc.setFontSize(10);

    autoTable(doc, {
      head: [['#', 'Nom', 'Phone', 'Sex', 'Âge', 'Ville', "Program", "Diplome", "Centre"]],
      body: tableData,
      columnStyles: {
        5: { cellWidth: 20 },
        9: { cellWidth: 20 },
        8: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 40 }
      }

    })

    // Récupérer le nombre total de pages dans le document
    const totalPages = doc.getNumberOfPages();

    // Parcourir toutes les pages du document
    for (let i = 1; i <= totalPages; i++) {
      // Aller à la page i
      doc.setPage(i);

      // Ajouter le numéro de page dans le coin inférieur droit
      doc.text(`IRDSM AVIATION - Page ${i} / ${totalPages}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10);
    }

    //doc.save('Réponses aux formulaire-' + current_date)

    const pdfFile = new File([doc.output('blob')], 'Réponses aux formulaire.pdf', { type: 'application/pdf' });
    const formData = new FormData();
    formData.append('pdfFile', pdfFile, pdfFile.name);

    this.http.post(`${GlobalConstants.apiURL}/submission/generateListPDF`, formData, this.token.getHeader())
      .subscribe(
        (response: any) => {
          this.toastr.success(response.message, 'Succès');

        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.toastr.error(error.message, 'Echec');

        });
  }



}
