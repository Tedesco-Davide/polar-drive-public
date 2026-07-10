// Un solo emulatore/una sola app: i test devono girare in sequenza, non in
// parallelo tra classi diverse (altrimenti più sessioni Appium si contendono
// la stessa UI e vanno tutte in timeout).
[assembly: NUnit.Framework.LevelOfParallelism(1)]
