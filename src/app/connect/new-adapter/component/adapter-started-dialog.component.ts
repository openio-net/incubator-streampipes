import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShepherdService} from '../../../services/tour/shepherd.service';
import {RestService} from "../../rest.service";
import {StatusMessage} from "../../model/message/StatusMessage";
import {GenericAdapterSetDescription} from '../../model/connect/GenericAdapterSetDescription';
import {SpecificAdapterSetDescription} from '../../model/connect/SpecificAdapterSetDescription';

@Component({
    selector: 'sp-dialog-adapter-started-dialog',
    templateUrl: './dialog-adapter-started.html',
    styleUrls: ['./adapter-started-dialog.component.css'],
})
export class AdapterStartedDialog {

    private adapterInstalled: boolean = false;
    private adapterStatus: StatusMessage;
    private streamDescription: any;
    private pollingActive: boolean = false;
    private runtimeData: any;
    private isSetAdapter: boolean = false;
    private isTemplate: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AdapterStartedDialog>,
        private restService: RestService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ShepherdService: ShepherdService) { }

    ngOnInit() {
        this.startAdapter();
    }

    startAdapter() {
        if (this.data.storeAsTemplate) {

            this.restService.addAdapterTemplate(this.data.adapter).subscribe(x => {
                this.adapterStatus = x;
                this.isTemplate = true;
                this.adapterInstalled = true;
            });

        } else {

            var newAdapter = this.data.adapter;
            this.restService.addAdapter(this.data.adapter).subscribe(x => {
                this.adapterInstalled = true;
                this.adapterStatus = x;
                if (x.success) {
                    // Start preview on streams and message for sets
                    if (newAdapter instanceof GenericAdapterSetDescription || newAdapter instanceof SpecificAdapterSetDescription) {
                        this.isSetAdapter = true;
                    } else {
                        this.restService.getSourceDetails(x.notifications[0].title).subscribe(x => {
                            this.streamDescription = x.spDataStreams[0];
                            this.pollingActive = true;
                            this.getLatestRuntimeInfo();
                        });
                    }

                }
            });

        }
    }

    getLatestRuntimeInfo() {
        this.restService.getRuntimeInfo(this.streamDescription).subscribe(data => {
            if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
                this.runtimeData = data;
            }

            if (this.pollingActive) {
                setTimeout(() => {
                    this.getLatestRuntimeInfo();
                }, 1000);
            }
        });
    }

    onCloseConfirm() {
        this.pollingActive = false;
        this.dialogRef.close('Confirm');
        this.ShepherdService.trigger("confirm_adapter_started_button");
    }

}