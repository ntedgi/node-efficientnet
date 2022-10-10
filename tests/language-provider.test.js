const {
  EfficientNetLableLanguage,
  EfficientNetLanguageProvider,
} = require("../index");

test("EfficientNetLanguageProvider - check english translation file", (done) => {
  const englishProvider = new EfficientNetLanguageProvider(
    EfficientNetLableLanguage.ENGLISH
  );
  englishProvider
    .load()
    .then(() => {
      const result = englishProvider.get(0);
      expect(result).toBeDefined();
      expect(result).toEqual("tench, Tinca tinca");
      done();
    })
    .catch((error) => done(error));
});
test("EfficientNetLanguageProvider - check chinese translation file", (done) => {
  const chineseProvider = new EfficientNetLanguageProvider(
    EfficientNetLableLanguage.CHINESE
  );
  chineseProvider
    .load()
    .then(() => {
      const result = chineseProvider.get(0);
      expect(result).toBeDefined();
      expect(result).toEqual("丁鲷");
      done();
    })
    .catch((error) => done(error));
});
test("EfficientNetLanguageProvider - check spanish translation file", (done) => {
  const spanishProvider = new EfficientNetLanguageProvider(
    EfficientNetLableLanguage.SPANISH
  );
  spanishProvider
    .load()
    .then(() => {
      const result = spanishProvider.get(0);
      expect(result).toBeDefined();
      expect(result).toEqual("tenca, Tinca tinca");
      done();
    })
    .catch((error) => done(error));
});

test("EfficientNetLanguageProvider - check russian translation file", (done) => {
  const russianLanguageProvider = new EfficientNetLanguageProvider(
    EfficientNetLableLanguage.RUSSIAN
  );
  
  russianLanguageProvider
    .load()
    .then(() => {
      const result = russianLanguageProvider.get(0);
      expect(result).toBeDefined();
      expect(result).toEqual("линь, Тинка-тинка");
      done();
    })
    .catch((error) => done(error));
});

test("EfficientNetLanguageProvider - check arabic translation file", (done) => {
  const arabicProvider = new EfficientNetLanguageProvider(
    EfficientNetLableLanguage.ARABIC
  );
  
  arabicProvider
    .load()
    .then(() => {
      const result = arabicProvider.get(0);
      expect(result).toBeDefined();
      expect(result).toEqual("تنش ، تينكا تينكا");
      done();
    })
    .catch((error) => done(error));
});
