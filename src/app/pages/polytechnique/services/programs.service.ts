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
      name: "Energie renouvelables",
      duration: "03"
    },
    {
      name: "Mécanique naval",
      duration: "03"
    },
    {
      name: "Carrelage",
      duration: "004"
    },
    {
      name: "Bâtiment",
      duration: "004"
    },
    {
      name: "Magasinier",
      duration: "03"
    },
    {
      name: "Construction bâtiments",
      duration: "004"
    },
    {
      name: "Pont et chaussées",
      duration: "004"
    },
    {
      name: "Peinture bâtiments",
      duration: "004"
    },
    {
      name: "Dessins et projections",
      duration: "004"
    },
    {
      name: "Electrotechnique",
      duration: "004"
    },
    {
      name: "Electricité naval",
      duration: "004"
    },
    {
      name: "Maintenance informatique",
      duration: "004"
    },
    {
      name: "Maintenance biomédicale",
      duration: "004"
    },
    {
      name: "Maintenance électromécanique",
      duration: "03"
    },
    {
      name: "Agent Fret ; Import/Export ; Transitaire ; Magasinier",
      duration: "03"
    },
    {
      name: "Réseaux et télécommunication",
      duration: "004"
    },
    {
      name: "Montage vidéo",
      duration: "03"
    },
    {
      name: "Montage des réseaux informatiques",
      duration: "004"
    },
    {
      name: "Construction d’ouvrage métallique",
      duration: "004"
    },
    {
      name: "Coffrage ferraillage",
      duration: "004"
    },
    {
      name: "Matelotage",
      duration: "004"
    },
    {
      name: "Plomberie et installation sanitaire",
      duration: "004"
    },
    {
      name: "Topographie géométrie",
      duration: "004"
    }
  ];

  dateComp = [
    {
      code: "121222",
      name: "Concours du 12 Décembre 2022",
    }
  ];


  listConcours = [
    {
      code: "121222",
      name: "Concours du 12 Décembre 2022",
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
