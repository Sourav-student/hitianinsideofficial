import mongoose from 'mongoose';

const homepageElementListSchema = new mongoose.Schema({
  event_name: { 
    type: String 
  },
  event_poster: { 
    type: String 
  },
  event_content: { 
    type: String 
  },
  event_form_link: {
    type: String 
  }
});

const HomepageElementList = mongoose.model('HomepageElementList', homepageElementListSchema);

export default HomepageElementList;