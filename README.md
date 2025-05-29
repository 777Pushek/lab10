Rozwiązanie zadania:
Zadanie zostało opracowane z łańcuchem w usłudze GitHub Actions.
Cały pipline opiera sie na:
1. Pobranie kodu źródłowego
2. Definicja metadanych obrazu
3. Przygotowanie środowiska
4. Logowanie do DockerHub
5. Zbudowanie oddzielnych obrazów na platforme:
-amd64
-arm64
Każdy obraz tagowany jest jako tempimg:<arch> i NIE jest wypychany, wykorzystywany jest cache pobieranie z dockerhub oraz eksport cache w trybie mode=max
6. Następnie pojedyncze te obrazy są skanowane przez Trivy (skaner nie wspiera ten obrazów z więcej niż jedną architekturą dlatego postanowiłem rozbić i oddzielnie budować obrazy i oddzielnie je skanować)
7. Jeśli skanowanie sie powiodło finalny obraz jest budowany na dwie architektury i wypychany co ważne z tagiem sha-<hash>

Finalny obraz tagowany jest jako hash.

Użyte komendy:
Do uruchomienia łańcucha CI:
- gh workflow run
Sprawdzenie statusu wykonania lancucha CI:
- gh run view
oraz reszta trywialna do wypychania na gita ;).

Link do ostatniego poprawnego działania łańcucha GHAction:
https://github.com/777Pushek/lab10/actions/runs/15324720448
