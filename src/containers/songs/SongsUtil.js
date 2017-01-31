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

}

