/** Login shell. Artist names are not in this document; the desk script loads them after login. */
export function loginPageHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Booking desk</title>
  <link rel="icon" href="/booking/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/booking/css/styles.css">
  <link rel="stylesheet" href="/booking/css/desk.css">
</head>
<body class="desk-body">
  <main id="desk"></main>
  <script src="/booking/js/desk.js" defer></script>
</body>
</html>`;
}
