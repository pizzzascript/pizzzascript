$json = Get-Content -Path 'e:\New folder (2)\pizzascript\assets\animations\pizza-glitch-animation.json' -Raw -Encoding UTF8
$output = 'var pizzaGlitchAnimationData = ' + $json + ';'
[System.IO.File]::WriteAllText('e:\New folder (2)\pizzascript\assets\animations\pizza-glitch-animation-data.js', $output, [System.Text.Encoding]::UTF8)
Write-Host "Done"
