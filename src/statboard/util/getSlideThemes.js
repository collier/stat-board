module.exports = (themes, theme) => {
  const titleTheme = themes[`title${theme}`] ? themes[`title${theme}`] : 'titleDefault';
  const bodyTheme = themes[`body${theme}`] ? themes[`body${theme}`] : 'bodyDefault';
  return { titleTheme, bodyTheme };
};