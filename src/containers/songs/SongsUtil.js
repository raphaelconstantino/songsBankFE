import moment from 'moment';

export default class SongsUtil {

    static getStatus () {
        return [
			{_id : "1", name : "Learning"}, // Learning
			{_id : "2", name : "Learned"}, // Learned
			{_id : "3", name : "To Learn"} // To learn
		];
    }

    static getStatusLabel (filterVal) {
        let arr = this.getStatus().filter(arVal => arVal._id === filterVal);

        if (!arr.length)
        {
            return "";
        }
        
        return arr[0].name;
    }

	static daysRemaining (date) {
	    let eventdate = moment(date);
	    let todaysdate = moment();
	    return eventdate.diff(todaysdate, 'days');
	}

    static getPercentage (val) {
		
		let total = 100;
		let iPos = val * -1;
		let iDif = 4;
		let iResult = 0;

		if (iPos > 7)
		{
			iDif = 7;
		} else if (iPos > 4)
		{
			iDif = 5;
		}

		let finalVal = val * iDif;
		
		iResult = (total + finalVal);

		if (iResult < 0)
		{
			iResult = 0;
		}

		return iResult;
	}

}

