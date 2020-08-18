import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class ModuleConfigService {
    moduleConfig;

    constructor(){
        this.setConfig( JSON.parse(localStorage.getItem("modules")) ); 
    }

    getModules(){
        return this.moduleConfig;
    }

    getViews(module:String){
        return this.moduleConfig.find(p => p.path === module );
    }

    getAccess(fullpath:String){
        const modulepath = fullpath.split("/")[1];
        return this.moduleConfig.find(p => p.path === modulepath).views.find(v => v.path === fullpath) ;
    }

    setConfig(config: any){
        this.moduleConfig = config;
    }
}