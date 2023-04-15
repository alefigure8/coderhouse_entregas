//Cookie extractor
export const cookieExtractor = (req) => {
    const token = req?.signedCookies?.token;
    return token;
  };