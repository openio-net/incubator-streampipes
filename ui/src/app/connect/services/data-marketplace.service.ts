/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthStatusService } from '../../services/auth-status.service';
import { ConnectService } from './connect.service';
import {
  AdapterDescription,
  AdapterDescriptionUnion,
  GenericAdapterSetDescription,
  GenericAdapterStreamDescription,
  Message,
  SpecificAdapterSetDescription,
  SpecificAdapterStreamDescription
} from '../../core-model/gen/streampipes-model';
import { Observable } from 'rxjs';
import { PlatformServicesCommons } from '../../platform-services/apis/commons.service';

@Injectable()
export class DataMarketplaceService {

  constructor(
    private http: HttpClient,
    private authStatusService: AuthStatusService,
    private connectService: ConnectService,
    private platformServicesCommons: PlatformServicesCommons) {
  }

  get connectPath() {
    return `${this.platformServicesCommons.apiBasePath()}/connect`;
  }

  getAdapterDescriptions(): Observable<AdapterDescriptionUnion[]> {
    return this.requestAdapterDescriptions('/master/description/adapters');

  }

  getAdapters(): Observable<AdapterDescriptionUnion[]> {
    return this.requestAdapterDescriptions('/master/adapters');
  }

  requestAdapterDescriptions(path: string): Observable<AdapterDescriptionUnion[]> {
    return this.http
      .get(
        this.connectPath +
        path
      )
      .pipe(map(response => {
        return (response as any[]).map(p => AdapterDescription.fromDataUnion(p));
      }));
  }

  stopAdapter(adapter: AdapterDescriptionUnion): Observable<Message> {
    return this.http.post(this.adapterMasterUrl
      + adapter.elementId
      + '/stop', {})
      .pipe(map(response => Message.fromData(response as any)));
  }

  startAdapter(adapter: AdapterDescriptionUnion): Observable<Message> {
    return this.http.post(this.adapterMasterUrl
      + adapter.elementId
      + '/start', {})
      .pipe(map(response => Message.fromData(response as any)));
  }

  get adapterMasterUrl() {
    return `${this.connectPath}/master/adapters/`;
  }

  deleteAdapter(adapter: AdapterDescription): Observable<any> {
    return this.deleteRequest(adapter, '/master/adapters/');
  }

  deleteAdapterTemplate(adapter: AdapterDescription): Observable<any> {
    return this.deleteRequest(adapter, '/master/adapters/template/');
  }

  getAdapterCategories(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/api/v2/categories/adapter`);
  }

  private deleteRequest(adapter: AdapterDescription, url: string) {
    return this.http.delete(
      this.connectPath +
      url +
      adapter.elementId
    );
  }

  /**
   * @deprecated The method should not be used
   */
  // getProtocols(): Observable<AdapterDescriptionUnion[]> {
  //   return this.http
  //     .get(
  //       `${this.connectPath}/master/description/protocols`
  //     )
  //     .pipe(map(response => {
  //       const adapterDescriptions: AdapterDescriptionUnion[] = [];
  //       const protocols: ProtocolDescription[] = (ProtocolDescriptionList.fromData(response as ProtocolDescriptionList)).list;
  //
  //       for (const protocol of protocols) {
  //         let newAdapterDescription: AdapterDescriptionUnion;
  //         if (protocol.sourceType === 'SET') {
  //           newAdapterDescription = new GenericAdapterSetDescription();
  //           newAdapterDescription['@class'] = 'org.apache.streampipes.model.connect.adapter.GenericAdapterSetDescription';
  //           newAdapterDescription.dataSet = new SpDataSet();
  //           newAdapterDescription.dataSet.eventSchema = new EventSchema();
  //         } else if (protocol.sourceType === 'STREAM') {
  //           newAdapterDescription = new GenericAdapterStreamDescription();
  //           newAdapterDescription['@class'] = 'org.apache.streampipes.model.connect.adapter.GenericAdapterStreamDescription';
  //           newAdapterDescription.dataStream = new SpDataStream();
  //           newAdapterDescription.dataStream.eventSchema = new EventSchema();
  //         }
  //         newAdapterDescription.appId = protocol.appId;
  //         newAdapterDescription.name = protocol.name;
  //         newAdapterDescription.description = protocol.description;
  //         newAdapterDescription.iconUrl = protocol.iconUrl;
  //         newAdapterDescription.uri = newAdapterDescription.elementId;
  //         newAdapterDescription.category = protocol.category;
  //         newAdapterDescription.includedAssets = protocol.includedAssets;
  //         newAdapterDescription.includesAssets = protocol.includesAssets;
  //         newAdapterDescription.includedLocales = protocol.includedLocales;
  //         newAdapterDescription.includesLocales = protocol.includesLocales;
  //
  //         if (
  //           newAdapterDescription instanceof GenericAdapterSetDescription ||
  //           newAdapterDescription instanceof GenericAdapterStreamDescription
  //         ) {
  //           newAdapterDescription.protocolDescription = protocol;
  //         }
  //         adapterDescriptions.push(newAdapterDescription);
  //       }
  //       return adapterDescriptions;
  //     }));
  // }

  // sortStaticProperties(sp: StaticProperty) {
  //   if (sp instanceof AlternativesStaticProperty) {
  //     sp.alternatives.sort((a, b) => a.index - b.index);
  //     sp.alternatives.forEach(a => {
  //       if (a.staticProperty instanceof GroupStaticProperty) {
  //         a.staticProperty.staticProperties.sort((a, b) => a.index - b.index);
  //       } else if (a.staticProperty instanceof CollectionStaticProperty) {
  //         this.sortStaticProperties((<CollectionStaticProperty> a.staticProperty).staticPropertyTemplate)
  //       }
  //     })
  //   } else if (sp instanceof GroupStaticProperty) {
  //       sp.staticProperties.sort((a, b) => a.index - b.index);
  //   } else if (sp instanceof CollectionStaticProperty) {
  //       this.sortStaticProperties((<CollectionStaticProperty> sp).staticPropertyTemplate)
  //   }
  // }

  // getGenericAndSpecificAdapterDescriptions(): Observable<[AdapterDescriptionUnion[], AdapterDescriptionUnion[]]> {
  //   return zip(this.getAdapterDescriptions(), this.getProtocols());
  // }

  cloneAdapterDescription(toClone: AdapterDescriptionUnion): AdapterDescriptionUnion {
    let result: AdapterDescriptionUnion;

    if (this.connectService.isGenericDescription(toClone)) {
      if (toClone instanceof GenericAdapterStreamDescription) {
        result = GenericAdapterStreamDescription.fromData(toClone, new GenericAdapterStreamDescription());
      } else if (toClone instanceof GenericAdapterSetDescription) {
        result = GenericAdapterSetDescription.fromData(toClone, new GenericAdapterSetDescription());
      }
    } else {
      if (toClone instanceof SpecificAdapterStreamDescription) {
        result = SpecificAdapterStreamDescription.fromData(toClone, new SpecificAdapterStreamDescription());
      } else if (toClone instanceof SpecificAdapterSetDescription) {
        result = SpecificAdapterSetDescription.fromData(toClone, new SpecificAdapterSetDescription());
      }
    }

    return result;
  }

  getAssetUrl(appId) {
    return `${this.connectPath}/master/description/${appId}/assets`;
  }

  private get baseUrl() {
    return '/streampipes-backend';
  }
}
