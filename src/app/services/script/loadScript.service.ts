export class LoadScript {
    public loadScript(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

    public loadJS() {
        this.loadScript('../assets/js/jquery.js');
        this.loadScript('../assets/js/plugins.js');
        this.loadScript('../assets/js/functions.js');
        this.loadScript('../assets/js/form.js');
    }

}