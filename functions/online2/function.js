/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.online2 = (req, res) => {

   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify({ a: 1 }, null, 3));

  //let message = req.query.message || req.body.message || 'online';
  res.status(200).send();
};

