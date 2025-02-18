export function HTMLCharConvet(text: string) {
   return text.replace(/[^A-Za-z0-9]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
   });
}
