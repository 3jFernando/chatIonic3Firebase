import { 
	Component } from '@angular/core'
import { 
	IonicPage } from 'ionic-angular'

@IonicPage()
@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root:string = "HomePage"
  tab2Root:string = "ContactPage"
  tab3Root:string = "PublicationPage"

  constructor() {}

}