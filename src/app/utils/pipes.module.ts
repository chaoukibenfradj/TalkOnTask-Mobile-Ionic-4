import { NgModule } from '@angular/core';
import { MomentPipe } from 'src/pipes/moment.pipe';
import { ShortenStringPipe } from 'src/pipes/shorten.pipe';
import { CapitalizePipe } from 'src/pipes/capitalize.pipe';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { TemperaturePipe } from 'src/pipes/temperature.pipe';

@NgModule({
     declarations:
        [
            MomentPipe,
            ShortenStringPipe,
            CapitalizePipe,
            OrderByPipe,
            TemperaturePipe
        ],
    exports: [
        MomentPipe,
        ShortenStringPipe,
        CapitalizePipe,
        OrderByPipe,
        TemperaturePipe
    ]
})
export class PipesModule {

}