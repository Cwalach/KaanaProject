import { Injectable } from "@angular/core"

@Injectable()
export class ParseDate {
    constructor() {
    }

    
    anum = {
        1: "א'", 2: "ב'", 3: "ג'",
        4: "ד'", 5: "ה'", 6: "ו'", 7: "ז'",
        8: "ח'", 9: "ט'", 10: "י'"
        , 11: 'י"א', 12: 'י"ב', 13: 'י"ג', 14: 'י"ד', 15: 'ט"ו', 16: 'ט"ז', 17: 'י"ז', 18: 'י"ח', 19: 'י"ט'
        , 20: "כ'", 21: 'כ"א', 22: 'כ"ב', 23: 'כ"ג', 24: 'כ"ד', 25: 'כ"ה', 26: 'כ"ו', 27: 'כ"ז', 28: 'כ"ח', 29: 'כ"ט',
        30: "ל'"
    }
    
    getHebrowNameByGreb(date) {
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return (this.FormatDateH(this.GregToHeb(date)))
    }

    MonSinceFirstMolad(nYearH) {
        var nMonSinceFirstMolad
        nYearH--

        nMonSinceFirstMolad = Math.floor(nYearH / 19) * 235
        nYearH = nYearH % 19
        nMonSinceFirstMolad += 12 * nYearH
        if (nYearH >= 17) {
            nMonSinceFirstMolad += 6
        } else if (nYearH >= 14) {
            nMonSinceFirstMolad += 5
        } else if (nYearH >= 11) {
            nMonSinceFirstMolad += 4
        } else if (nYearH >= 8) {
            nMonSinceFirstMolad += 3
        } else if (nYearH >= 6) {
            nMonSinceFirstMolad += 2
        } else if (nYearH >= 3) {
            nMonSinceFirstMolad += 1
        }
        return nMonSinceFirstMolad
    }

    IsLeapYear(nYearH) {
        var nYearInCycle

        nYearInCycle = nYearH % 19
        return (nYearInCycle == 3 ||
            nYearInCycle == 6 ||
            nYearInCycle == 8 ||
            nYearInCycle == 11 ||
            nYearInCycle == 14 ||
            nYearInCycle == 17 ||
            nYearInCycle == 0)
    }

    Tishrei1(nYearH) {
        var nMonthsSinceFirstMolad
        var nChalakim
        var nHours
        var nDays
        var nDayOfWeek
        var dTishrei1

        nMonthsSinceFirstMolad = this.MonSinceFirstMolad(nYearH)
        nChalakim = 793 * nMonthsSinceFirstMolad
        nChalakim += 204
        nHours = Math.floor(nChalakim / 1080)
        nChalakim = nChalakim % 1080

        nHours += nMonthsSinceFirstMolad * 12
        nHours += 5

        nDays = Math.floor(nHours / 24)
        nHours = nHours % 24

        nDays += 29 * nMonthsSinceFirstMolad
        nDays += 2

        nDayOfWeek = nDays % 7

        if (!this.IsLeapYear(nYearH) &&
            nDayOfWeek == 3 &&
            (nHours * 1080) + nChalakim >= (9 * 1080) + 204) {
            nDayOfWeek = 5
            nDays += 2
        }
        else if (this.IsLeapYear(nYearH - 1) &&
            nDayOfWeek == 2 &&
            (nHours * 1080) + nChalakim >= (15 * 1080) + 589) {
            nDayOfWeek = 3
            nDays += 1
        }
        else {
            if (nHours >= 18) {
                nDayOfWeek += 1
                nDayOfWeek = nDayOfWeek % 7
                nDays += 1
            }
            if (nDayOfWeek == 1 ||
                nDayOfWeek == 4 ||
                nDayOfWeek == 6) {
                nDayOfWeek += 1
                nDayOfWeek = nDayOfWeek % 7
                nDays += 1
            }
        }

        nDays -= 2067025
        dTishrei1 = new Date(1900, 0, 1)
        dTishrei1.setDate(dTishrei1.getDate() + nDays)

        return dTishrei1
    }

    LengthOfYear(nYearH) {
        var dThisTishrei1
        var dNextTishrei1
        var diff

        dThisTishrei1 = this.Tishrei1(nYearH)
        dNextTishrei1 = this.Tishrei1(nYearH + 1)
        diff = (dNextTishrei1 - dThisTishrei1) / (1000 * 60 * 60 * 24)
        return Math.round(diff)
    }

   GregToHeb(dGreg: Date) {
        var nYearH
        var nMonthH
        var nDateH
        var nOneMolad
        var nAvrgYear
        var nDays
        var dTishrei1
        var nLengthOfYear
        var bLeap
        var bHaser
        var bShalem
        var nMonthLen
        var bWhile
        var d1900 = new Date(1900, 0, 1)

        nOneMolad = 29 + (12 / 24) + (793 / (1080 * 24))
        nAvrgYear = nOneMolad * (235 / 19)
       nDays = Math.round((dGreg.getTime() - d1900.getTime()) / (24 * 60 * 60 * 1000))
        nDays += 2067025
        nYearH = Math.floor(nDays / nAvrgYear) + 1
       dTishrei1 = this.Tishrei1(nYearH)

       if (this.SameDate(dTishrei1, dGreg)) {
            nMonthH = 1
            nDateH = 1
        }
        else {
            if (dTishrei1 < dGreg) {
                while (this.Tishrei1(nYearH + 1) <= dGreg) {
                    nYearH += 1
                }
            }
            else {
                nYearH -= 1
                while (this.Tishrei1(nYearH) > dGreg) {
                    nYearH -= 1
                }
            }

           nDays = (dGreg.getTime() - this.Tishrei1(nYearH)) / (24 * 60 * 60 * 1000)
            nDays = Math.round(nDays)
           nLengthOfYear = this.LengthOfYear(nYearH)
            bHaser = nLengthOfYear == 353 || nLengthOfYear == 383
            bShalem = nLengthOfYear == 355 || nLengthOfYear == 385
           bLeap = this.IsLeapYear(nYearH)

            nMonthH = 1
            do {

                switch (nMonthH) {
                    case 1:
                    case 5:
                    case 6:
                    case 8:
                    case 10:
                    case 12:
                        nMonthLen = 30
                        break
                    case 4:
                    case 7:
                    case 9:
                    case 11:
                    case 13:
                        nMonthLen = 29
                        break
                    case 6:
                        nMonthLen = 30
                        break
                    case 2:
                        nMonthLen = (bShalem ? 30 : 29)
                        break
                    case 3:
                        nMonthLen = (bHaser ? 29 : 30)
                        break
                }

                if (nDays >= nMonthLen) {
                    bWhile = true
                    if (bLeap || nMonthH != 5) {
                        nMonthH++
                    }
                    else {
                        nMonthH += 2
                    }
                    nDays -= nMonthLen
                }
                else {
                    bWhile = false
                }
            } while (bWhile)
            nDateH = nDays + 1
           nDateH = this.anum[nDateH];
        }
        return nMonthH + "/" + nDateH + "/" + nYearH
    }

    SameDate(d1, d2) {
        return (d1.getFullYear() == d2.getFullYear() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getDate() == d2.getDate())

    }

    FormatDateH(cDate) {
        var aDate = new Array()
        var cFormatDate

        aDate = cDate.split("/")
        switch (Number(aDate[0])) {
            case 1:
                cFormatDate = "תשרי"
                break
            case 2:
                cFormatDate = "חשון"
                break
            case 3:
                cFormatDate = "כסליו"
                break
            case 4:
                cFormatDate = "טבת"
                break
            case 5:
                cFormatDate = "שבט"
                break
            case 6:
                cFormatDate = "אדר א"
                break
            case 7:
                cFormatDate = (this.IsLeapYear(Number(aDate[2])) ? "אדר ב" : "אדר")
                break
            case 8:
                cFormatDate = "ניסן"
                break
            case 9:
                cFormatDate = "אייר"
                break
            case 10:
                cFormatDate = "סיון"
                break
            case 11:
                cFormatDate = "תמוז"
                break
            case 12:
                cFormatDate = "אב"
                break
            case 13:
                cFormatDate = "אלול"
                break
        }
        //להמיר את הדנה לשנה באותיות - משנה לועזית לשנה עברית
        //adate[2]=
        return aDate[1] + " " + cFormatDate// + " " + aDate[2]
    }
}