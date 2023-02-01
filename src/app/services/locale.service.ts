export class LocaleService {

    lang = navigator.language.substr(0, 2);

    switchFr() {
        this.lang = "fr";
    }

    switchEn() {
        this.lang = "en";

    }
}