import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {


  programsSubject = new Subject<any[]>();
  dateCompSubject = new Subject<any[]>();
  nEtudeSubject = new Subject<any[]>();


  constructor() { }

  programs = [
    {
      code: "PLT",
      name: "Licence de pilote de ligne",
      duration: "03"
    },
    {
      code: "ATE",
      name: "Agent Technique D'exploitation",
      duration: "004"
    },
    {
      code: "CTA",
      name: "Construction Aéronautique",
      duration: "03"
    },
    {
      code: "PNC",
      name: "Hôtesse de l'air / Steward",
      duration: "004"
    },
    {
      code: "PVB",
      name: "Passage Vente / Billeterie d'avion",
      duration: "004"
    },
    {
      code: "HAC",
      name: "Hôtesse d'accueil",
      duration: "004"
    },
    {
      code: "PSS",
      name: "Passage Sol ",
      duration: "004"
    },
    {
      code: "CC",
      name: "Contrôle de Chargement",
      duration: "004"
    }
  ];

  dateComp = [
    {
      code: "070522",
      name: "Concours du 07 Mai 2022",
    }
  ];


  listConcours = [
    {
      code: "070522",
      name: "Concours du 07 Mai 2022",
    }
  ];


  nEtdute = [
    {
      code: "M",
      name: "Master ou Equivalent",
    },
    {
      code: "L",
      name: "Licence ou Equivalent",
    },
    {
      code: "BTS",
      name: "Brévet de Technicien Supérieur ou Equivalent",
    },
    {
      code: "BAC",
      name: "Baccalauréat ou Equivalent",
    },
    {
      code: "PROB",
      name: "Probatoire ou Equivalent",
    },
    {
      code: "BEPC",
      name: "BEPC ou Equivalent",
    }
  ];

  emitProgramsSubject() {
    this.programsSubject.next(this.programs.slice());
  }

  emitDateSubject() {
    this.dateCompSubject.next(this.dateComp.slice());
  }

  emitnEtudeSubject() {
    this.nEtudeSubject.next(this.nEtdute.slice());
  }

}
