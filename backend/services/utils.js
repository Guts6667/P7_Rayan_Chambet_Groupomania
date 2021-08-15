/*Permet de prévenir contre les injections en remplaçant les symboles */
exports.strip_tags = (string) =>
{
  return string.replace(/(<([^>]+)>)/ig,"");
}
