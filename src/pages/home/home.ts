import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  run =   {
      "geo":[
         {
            "nickname":"ad",
            "geo":{
               "address_components":[
                  {
                     "long_name":"Paul Drive",
                     "short_name":"Paul Dr",
                     "types":[
                        "route"
                     ]
                  },
                  {
                     "long_name":"Chester",
                     "short_name":"Chester",
                     "types":[
                        "locality",
                        "political"
                     ]
                  },
                  {
                     "long_name":"Chester",
                     "short_name":"Chester",
                     "types":[
                        "administrative_area_level_3",
                        "political"
                     ]
                  },
                  {
                     "long_name":"Randolph County",
                     "short_name":"Randolph County",
                     "types":[
                        "administrative_area_level_2",
                        "political"
                     ]
                  },
                  {
                     "long_name":"Illinois",
                     "short_name":"IL",
                     "types":[
                        "administrative_area_level_1",
                        "political"
                     ]
                  },
                  {
                     "long_name":"United States",
                     "short_name":"US",
                     "types":[
                        "country",
                        "political"
                     ]
                  },
                  {
                     "long_name":"62233",
                     "short_name":"62233",
                     "types":[
                        "postal_code"
                     ]
                  }
            ]}
         }
      ],
      "start_at":"2017-01-25T18:51:45.843Z",
      "end_at":"2017-03-04T23:58:26.584Z",
      "status":"finish",
      "runners":[
         {
            "runner":{
               "firstname":"Clément",
               "lastname":"Paul",
               "phone_number":"+33 388577728",
               "key":"b929c20e5b69c53c43ab07f72891057858a5d613839aea637267fd6d943659e1",
               "_id":"9fc4315f-8917-4889-a654-8d1e56d9e5c0"
            },
            "vehicle":{
               "name":"sit ipsa aliquid",
               "plate_number":"0952",
               "nb_place":8496,
               "status":"taken",
               "_id":"6c645ed4-571f-40bc-8197-609ed0dd8fe0"
            }
         },
         {
            "runner":{
               "firstname":"Arthur",
               "lastname":"Schneider",
               "phone_number":"0470090640",
               "key":"420c322d1caaea3467ac8e221465251b9d01a30bda06510e8a64f2e068ba2022",
               "_id":"8c414537-d563-4f8f-9439-fbdf1c9f5766"
            },
            "vehicle":{
               "name":"fuga tempore autem",
               "plate_number":"4665",
               "nb_place":89830,
               "status":"taken",
               "_id":"2a7c3536-949d-4fd0-bd60-1a38d11feb3e"
            }
         }
      ],
      "_id":"e3e773f9-a9eb-4cea-a144-c951a81cf4f5"
   };

  constructor(public navCtrl: NavController) { }

}
