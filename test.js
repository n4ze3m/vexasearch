import wiki from 'wikipedia';
import { summary } from 'wikipedia';

(async () => {
	try {
        let summary; //sets the object as type wikiSummary
		summary = await wiki.summary('Stalin');
		console.log(summary);
	} catch (error) {
		console.log(error);
		//=> Typeof summaryError, helpful in case you want to handle this error separately
	}
})();