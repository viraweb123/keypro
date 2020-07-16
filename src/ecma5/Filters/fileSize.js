"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

//todo show file size filter
exports.default = function () {
    return function (input) {
        if (typeof input !== "undefined" && !_.includes([null, ""], input)) {
            try {
                /* todo  sizes in world standard
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   Name         |   Simbol       |   description
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   bit          |   bit          |
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   byte         |   B            |   A Byte       is 8 bit
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   kilobyte     |   KB           |   A Kilobyte   is 1,024 bytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   megabyte     |   MB           |   A Megabyte   is 1,048,576 bytes or 1,024 Kilobytes
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   gigabyte     |   GB           |   A Gigabyte   is 1,073,741,824 (2^30) bytes. 1,024 Megabytes, or 1,048,576 Kilobytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   terabyte     |   TB           |   A Terabyte   is 1,099,511,627,776 (2^40) bytes, 1,024 Gigabytes, or 1,048,576 Megabytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   petabyte     |   PB           |   A Petabyte   is 1,125,899,906,842,624 (2^50) bytes, 1,024 Terabytes, 1,048,576 Gigabytes, or 1,073,741,824 Megabytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   exabyte      |   EB           |   A Exabyte    is 1,152,921,504,606,846,976 (2^60) bytes, 1,024 Petabytes, 1,048,576 Terabytes, 1,073,741,824 Gigabytes, or 1,099,511,627,776 Megabytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   zettabyte    |   ZB           |   A Zettabyte  is 1,180,591,620,717,411,303,424 (2^70) bytes, 1,024 Exabytes, 1,048,576 Petabytes, 1,073,741,824 Terabytes, 1,099,511,627,776 Gigabytes, or 1,125,899,910,000,000 Megabytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   yottabyte    |   YB           |   A Yottabyte  is 1,208,925,819,614,629,174,706,176 (2^80) bytes, 1,024 Zettabytes, 1,048,576 Exabytes, 1,073,741,824 Petabytes, 1,099,511,627,776 Terabytes, 1,125,899,910,000,000 Gigabytes, or 1,152,921,500,000,000,000 Megabytes.
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   brontobyte   |   BB           |   A brontobyte is  (2^90) bytes,
                 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                |   gegobyte     |   GEB          |   A gegobyte   is  (2^100) bytes
                -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                */

                var bitNumber = Number(input);
                if (bitNumber < 8) return bitNumber.toFixed(1) + " b";
                var byteNumber = bitNumber; ///8;
                if (byteNumber < 1024) return byteNumber.toFixed(1) + " B";
                var KilobyteNumber = byteNumber / 1024;
                if (KilobyteNumber < 1024) return KilobyteNumber.toFixed(1) + " KB";
                var MegabyteNumber = KilobyteNumber / 1024;
                if (MegabyteNumber < 1024) return MegabyteNumber.toFixed(1) + " MB";
                var GigabyteNumber = MegabyteNumber / 1024;
                if (GigabyteNumber < 1024) return GigabyteNumber.toFixed(1) + " GB";
                var TerabyteNumber = GigabyteNumber / 1024;
                if (TerabyteNumber < 1024) return TerabyteNumber.toFixed(1) + " TB";
                var PetabyteNumber = TerabyteNumber / 1024;
                if (PetabyteNumber < 1024) return PetabyteNumber.toFixed(1) + " PB";
                var ExabyteNumber = PetabyteNumber / 1024;
                if (ExabyteNumber < 1024) return ExabyteNumber.toFixed(1) + " EB";
                var ZettabyteNumber = ExabyteNumber / 1024;
                if (ZettabyteNumber < 1024) return ZettabyteNumber.toFixed(1) + " ZB";
                var YottabyteNumber = ZettabyteNumber / 1024;
                if (YottabyteNumber < 1024) return YottabyteNumber.toFixed(1) + " YB";
                var BrontobyteNumber = YottabyteNumber / 1024;
                if (BrontobyteNumber < 1024) return BrontobyteNumber.toFixed(1) + " BB";
                var GegobyteNumber = BrontobyteNumber / 1024;
                if (GegobyteNumber < 1024) return GegobyteNumber.toFixed(1) + " GEB";else return ":(";
            } catch (e) {
                return input;
            }
        } else return input;
    };
};

/*
var size = input => {
    try{
        var bitNumber =  Number(input);
        if(bitNumber<8)
            return `${bitNumber.toFixed(1)} bit`;
        var byteNumber =  bitNumber/8;
        if(byteNumber<1024)
            return `${byteNumber.toFixed(1)} B`;
        var KilobyteNumber =  byteNumber/1024;
        if(KilobyteNumber<1024)
            return `${KilobyteNumber.toFixed(1)} KB`;
        var MegabyteNumber =  KilobyteNumber/1024;
        if(MegabyteNumber<1024)
            return `${MegabyteNumber.toFixed(1)} MB`;
        var GigabyteNumber =  MegabyteNumber/1024;
        if(GigabyteNumber<1024)
            return `${GigabyteNumber.toFixed(1)} GB`;
        var TerabyteNumber =  GigabyteNumber/1024;
        if(TerabyteNumber<1024)
            return `${TerabyteNumber.toFixed(1)} TB`;
        var PetabyteNumber =  TerabyteNumber/1024;
        if(PetabyteNumber<1024)
            return `${PetabyteNumber.toFixed(1)} PB`;
        var ExabyteNumber =  PetabyteNumber/1024;
        if(ExabyteNumber<1024)
            return `${ExabyteNumber.toFixed(1)} EB`;
        var  ZettabyteNumber =  ExabyteNumber/1024;
        if(ZettabyteNumber<1024)
            return `${ZettabyteNumber.toFixed(1)} ZB`;
        var  YottabyteNumber =  ZettabyteNumber/1024;
        if(YottabyteNumber<1024)
            return `${YottabyteNumber.toFixed(1)} YB`;
         var  BrontobyteNumber =  YottabyteNumber/1024;
         if(BrontobyteNumber<1024)
            return `${BrontobyteNumber.toFixed(1)} BB`;
         var  GegobyteNumber =  BrontobyteNumber/1024;
         if(GegobyteNumber<1024)
            return `${GegobyteNumber.toFixed(1)} GBB`;

 else
            return `:(`;
    }catch(e){
        return input;
    }
};

 size(10384089999999999995436148587436934)  "1024.0 GBB"
*/