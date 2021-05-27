import { Injectable } from '@nestjs/common';
import * as convert from 'xml-js';
import * as md5 from 'md5-nodejs';

@Injectable()
export class DeliveryService {
  async xml(): Promise<any> {
    const enseigne = 'CC21IKYJ';
    const modeCol = 'CDS';
    const modeLiv = '24R';
    const expLang = 'FR';
    const expAd1 = 'MME MATHILDE GRIMAL';
    const expAd3 = '15 RUE DES AIRES';
    const expVille = 'MONTPELLIER';
    const expCP = '34000';
    const expPays = 'FR';
    const expTel = '0033655654345';
    const destLang = 'FR';
    const destAd1 = 'MME MATHILDE GRIMAL';
    const destAd3 = '15 RUE DES AIRES';
    const destVille = 'MONTPELLIER';
    const destCP = '34000';
    const destPays = 'FR';
    const destTel = '0033655654345';
    const poids = '500';
    const nbColis = '1';
    const CRT_Valeur = '1';
    const COL_Rel = 'AUTO';
    const COL_Rel_Pays = 'FR';
    const LIV_Rel = '154345';
    const LIV_Rel_Pays = 'FR';
    const TAvisage = 'O';
    const TReprise = 'O';
    const Security = 'HqVfeYJ3';
    const securityKey =
      enseigne +
      modeCol +
      modeLiv +
      expLang +
      expAd1 +
      expAd3 +
      expVille +
      expCP +
      expPays +
      expTel +
      destLang +
      destAd1 +
      destAd3 +
      destVille +
      destCP +
      destPays +
      destTel +
      poids +
      nbColis +
      CRT_Valeur +
      LIV_Rel_Pays +
      LIV_Rel +
      Security;
    const securityKeyEncrypted = md5(securityKey).toUpperCase();
    console.log(securityKeyEncrypted);
    console.log(securityKey);

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '<WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">' +
      '<Enseigne>' +
      enseigne +
      '</Enseigne>' +
      '<ModeCol>' +
      modeCol +
      '</ModeCol>' +
      '<ModeLiv>' +
      modeLiv +
      '</ModeLiv>' +
      '<Expe_Langage>' +
      expLang +
      '</Expe_Langage>' +
      '<Expe_Ad1>' +
      expAd1 +
      '</Expe_Ad1>' +
      '<Expe_Ad3>' +
      expAd3 +
      '</Expe_Ad3>' +
      '<Expe_Ville>' +
      expVille +
      '</Expe_Ville>' +
      '<Expe_CP>' +
      expCP +
      '</Expe_CP>' +
      '<Expe_Pays>' +
      expPays +
      '</Expe_Pays>' +
      '<Expe_Tel1>' +
      expTel +
      '</Expe_Tel1>' +
      '<Dest_Langage>' +
      destLang +
      '</Dest_Langage>' +
      '<Dest_Ad1>' +
      destAd1 +
      '</Dest_Ad1>' +
      '<Dest_Ad3>' +
      destAd3 +
      '</Dest_Ad3>' +
      '<Dest_Ville>' +
      destVille +
      '</Dest_Ville>' +
      '<Dest_CP>' +
      destCP +
      '</Dest_CP>' +
      '<Dest_Pays>' +
      destPays +
      '</Dest_Pays>' +
      '<Dest_Tel1>' +
      destTel +
      '</Dest_Tel1>' +
      '<Poids>' +
      poids +
      '</Poids>' +
      '<NbColis>' +
      nbColis +
      '</NbColis>' +
      '<CRT_Valeur>' +
      CRT_Valeur +
      '</CRT_Valeur>' +
      '<COL_Rel_Pays>' +
      COL_Rel_Pays +
      '</COL_Rel_Pays>' +
      '<COL_Rel>' +
      COL_Rel +
      '</COL_Rel>' +
      '<TAvisage>' +
      TAvisage +
      '</TAvisage>' +
      '<TReprise>' +
      TReprise +
      '</TReprise>' +
      '<Security>' +
      securityKeyEncrypted +
      '</Security>' +
      '</WSI2_CreationEtiquette>' +
      '</soap:Body>' +
      '</soap:Envelope>';
    const result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
    const result2 = convert.xml2json(xml, { compact: false, spaces: 4 });
    console.log(xml);

    //console.log(result1, '\n', result2);
  }
}
