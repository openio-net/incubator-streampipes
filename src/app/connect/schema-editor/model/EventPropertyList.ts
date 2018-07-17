import {EventProperty} from './EventProperty';
import {RdfsClass} from '../../tsonld/RdfsClass';
import {RdfProperty} from '../../tsonld/RdfsProperty';
//  extends EventProperty

@RdfsClass('sp:EventPropertyList')
export class EventPropertyList extends EventProperty {

    @RdfProperty('sp:hasEventProperty')
    eventProperties: EventProperty[];

    constructor(propertyID: string, parent: EventProperty) {
        super(propertyID, parent);
        this.eventProperties = new Array(0);
    }

    public copy(): EventProperty {
        const result = new EventPropertyList(this.id, null);
        result.id = this.id;
        result.label = this.label;
        result.description = this.description;
        result.runTimeName = this.runTimeName;
        result.domainProperty = this.domainProperty;


        return result;
    }

}
