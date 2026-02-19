# Run this script AFTER installing Git (https://git-scm.com/download/win)
# In Cursor: Terminal -> New Terminal -> cd here, then: .\push-to-github.ps1

Set-Location $PSScriptRoot
$repo = "https://github.com/TierraOrigenCapital/tierra-origen-prestige-capital.git"

if (-not (Test-Path .git)) { git init }
git add .
git status
git commit -m "Initial commit - Tierra Origen Prestige Capital"
git branch -M main
if (git remote get-url origin 2>$null) { git remote set-url origin $repo } else { git remote add origin $repo }
git push -u origin main

Write-Host "`nDone! Code is on GitHub."
Write-Host "Next: Go to https://vercel.com/new and import this repo."
