import { NgModule } from '@angular/core';
import { PreloadAllModules } from "@angular/router";
import { Routes, RouterModule } from '@angular/router';
import { JploftComponent } from './jploft/jploft.component';



const routes: Routes = [
  {path:'',component:JploftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    enableTracing:false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
