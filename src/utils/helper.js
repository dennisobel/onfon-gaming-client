export function checkXmlResponse(xmlResponse) {
    // Define two regular expressions that match the two XML patterns.
    const pattern1 = /<SOAP-ENV:Envelope[^>]*>[\s\S]*?<ns1:MsisdnHash>(.*?)<\/ns1:MsisdnHash>[\s\S]*?<\/SOAP-ENV:Envelope>/;
    const pattern2 = /<SOAP-ENV:Envelope[^>]*>[\s\S]*?<ns0:ResponseCode>1<\/ns0:ResponseCode>[\s\S]*?<ns0:ResponseMsg>(.*?)<\/ns0:ResponseMsg>[\s\S]*?<\/SOAP-ENV:Envelope>/;

    // Check if the response matches either pattern.
    const match1 = pattern1.exec(xmlResponse);
    const match2 = pattern2.exec(xmlResponse);

    // If the response matches a pattern, return the pattern number and the extracted value.
    if (match1) {
        return [1, match1[1]];
    } else if (match2) {
        return [2, match2[1]];
    } else {
        // The response does not match either pattern.
        return null;
    }
}
