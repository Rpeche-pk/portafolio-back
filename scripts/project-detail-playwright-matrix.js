async (page) => {
  const baseUrl = 'http://127.0.0.1:8766';
  const routes = [
    ['zephyr', 'project-page.html'],
    ['devbot-supermarket', 'project-page-1.html'],
    ['cashier', 'project-page-2.html'],
    ['trucking', 'project-page-3.html'],
    ['maipevi-bot', 'project-page-4.html'],
    ['ai-assistant', 'project-page-5.html'],
  ];
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push({ route: page.url(), message: message.text() });
  });
  page.on('pageerror', (error) => errors.push({ route: page.url(), message: error.message }));

  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const results = [];

  for (const [project, route] of routes) {
    const url = `${baseUrl}/${route}`;
    const viewportResults = [];

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
      const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      assert(response?.status() === 200, `${route} returned HTTP ${response?.status()}`);
      await page.evaluate(() => {
        document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; });
      });
      await page.waitForFunction(() => [...document.images].every((image) => image.complete));

      const state = await page.evaluate(() => ({
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        h1Count: document.querySelectorAll('h1').length,
        mainCount: document.querySelectorAll('main').length,
        pageLandmark: Boolean(document.querySelector('main section[aria-labelledby]')),
        images: [...document.images].map((image) => ({
          loaded: image.complete && image.naturalWidth > 0,
          hasAlt: image.hasAttribute('alt'),
          alt: image.getAttribute('alt'),
        })),
        projectOutboundCount: document.querySelectorAll('.project-detail-copy a[href^="http"]').length,
      }));

      assert(state.documentWidth <= state.viewport, `${route} overflows at ${width}px`);
      assert(state.h1Count === 1, `${route} must have one H1 at ${width}px`);
      assert(state.mainCount === 1 && state.pageLandmark, `${route} must expose its labelled main project landmark`);
      assert(state.images.length > 0 && state.images.every((image) => image.loaded && image.hasAlt), `${route} has an unloaded image or missing alt attribute`);
      assert(state.projectOutboundCount > 0, `${route} has no project outbound link`);
      viewportResults.push({ width, overflow: false, h1Count: state.h1Count, imageCount: state.images.length, allImagesLoadedAndNamed: true, projectOutboundCount: state.projectOutboundCount });
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('language', 'en');
      localStorage.setItem('portfolio-theme', 'light');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    const initialState = await page.evaluate(() => ({ language: document.documentElement.lang, theme: document.documentElement.dataset.theme, bootstrapTheme: document.documentElement.dataset.bsTheme }));
    assert(initialState.language === 'en' && initialState.theme === 'light' && initialState.bootstrapTheme === 'light', `${route} did not initialize in English/light state`);
    await page.locator('.mobile-menu > summary').click();

    await page.locator('[data-language="es"]:visible').first().click();
    await page.waitForFunction(() => document.documentElement.lang === 'es');
    assert(await page.evaluate(() => localStorage.getItem('language')) === 'es', `${route} did not persist Spanish`);
    let spanishAlts = null;
    if (project === 'zephyr') {
      spanishAlts = await page.locator('.project-detail-gallery img').evaluateAll((images) => images.map((image) => image.alt));
      assert(spanishAlts.every((alt) => alt.length > 0) && spanishAlts[0].includes('Zephyr Cygnus'), 'Zephyr Spanish alternatives were not applied');
    }

    await page.locator('[data-language="en"]:visible').first().click();
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    assert(await page.evaluate(() => localStorage.getItem('language')) === 'en', `${route} did not persist English`);
    let englishAlts = null;
    if (project === 'zephyr') {
      englishAlts = await page.locator('.project-detail-gallery img').evaluateAll((images) => images.map((image) => image.alt));
      assert(englishAlts.every((alt) => alt.length > 0) && englishAlts[0].startsWith('Zephyr Cygnus catalog'), 'Zephyr English alternatives were not applied');
      await page.locator('[data-language="es"]:visible').first().click();
      await page.waitForFunction(() => document.documentElement.lang === 'es');
      const restoredSpanishAlts = await page.locator('.project-detail-gallery img').evaluateAll((images) => images.map((image) => image.alt));
      assert(JSON.stringify(restoredSpanishAlts) === JSON.stringify(spanishAlts), 'Zephyr alternatives did not restore Spanish after switching back');
    }

    await page.locator('[data-theme-toggle]:visible').first().click();
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    const darkState = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      bootstrapTheme: document.documentElement.dataset.bsTheme,
      persisted: localStorage.getItem('portfolio-theme'),
      pressed: [...document.querySelectorAll('[data-theme-toggle]')].find((button) => button.getClientRects().length > 0)?.getAttribute('aria-pressed'),
    }));
    assert(darkState.theme === 'dark' && darkState.bootstrapTheme === 'dark' && darkState.persisted === 'dark' && darkState.pressed === 'true', `${route} dark theme did not synchronize, persist, and update its toggle`);
    await page.reload({ waitUntil: 'domcontentloaded' });
    const persistedTheme = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      bootstrapTheme: document.documentElement.dataset.bsTheme,
      pressed: [...document.querySelectorAll('[data-theme-toggle]')].find((button) => button.getClientRects().length > 0)?.getAttribute('aria-pressed'),
    }));
    assert(persistedTheme.theme === 'dark' && persistedTheme.bootstrapTheme === 'dark' && persistedTheme.pressed === 'true', `${route} dark theme did not survive reload`);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Tab');
    let focus = null;
    for (let index = 0; index < 20; index += 1) {
      focus = await page.evaluate(() => {
        const element = document.activeElement;
        const style = getComputedStyle(element);
        return {
          tag: element.tagName,
          className: typeof element.className === 'string' ? element.className : '',
          focusVisible: element.matches(':focus-visible'),
          outlineWidth: style.outlineWidth,
          outlineStyle: style.outlineStyle,
        };
      });
      if (focus.className.split(/\s+/).includes('nav-link') && focus.focusVisible) break;
      await page.keyboard.press('Tab');
    }
    assert(focus?.className.split(/\s+/).includes('nav-link') && focus.focusVisible && parseFloat(focus.outlineWidth) >= 3, `${route} keyboard navigation did not expose a 3px focus ring`);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reducedMotionDuration = await page.locator('.project-detail-copy a').first().evaluate((link) => getComputedStyle(link).transitionDuration);
    assert(reducedMotionDuration.split(',').every((duration) => parseFloat(duration) === 0), `${route} link transition is not disabled for reduced motion`);
    await page.emulateMedia({ reducedMotion: null });

    results.push({
      project,
      route,
      viewportChecks: viewportResults,
      language: { spanishAndEnglishSwitch: 'pass', persisted: true, zephyrAltCycle: project === 'zephyr' ? 'es→en→es pass' : 'pass' },
      theme: { lightToDark: 'pass', bootstrapSynchronized: true, persistedAfterReload: true, toggleAriaPressed: darkState.pressed },
      keyboardFocus: { targetClass: focus.className, focusVisible: focus.focusVisible, outlineWidth: focus.outlineWidth },
      reducedMotionTransitionDuration: reducedMotionDuration,
    });
  }

  assert(errors.length === 0, `Browser console/page errors: ${JSON.stringify(errors)}`);
  return {
    result: 'PASS',
    baseUrl,
    routesChecked: results.length,
    viewportCases: results.reduce((count, result) => count + result.viewportChecks.length, 0),
    browserErrors: errors,
    results,
  };
}
