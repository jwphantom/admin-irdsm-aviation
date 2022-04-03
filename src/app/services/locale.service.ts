export class LocaleService {

    lang = navigator.language.substr(0,2);
   
    switchFr() {
        this.lang = "fr";
        console.log('fr');
    }

    switchEn() {
        this.lang = "en";
        console.log('en');

    }
}