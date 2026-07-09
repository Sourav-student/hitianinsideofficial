import { Request, Response } from "express";
import EventsList from "../models/eventsListModel";
import { EventType } from "../types/datatypes";
import AlmanacList from "../models/almanacListModel";
import HomepageElementList from "../models/homepageElementListModel";
import Contact from "../models/contactModel";
import Photos from "../models/photoModel";
import Poems from "../models/poemModel";
import Artwork from "../models/artworkModel";
import { redisKey } from "../utils/redisKeys";
import { redis } from "../config/redisConnection";

type MulterRequest = Request & { file?: Express.Multer.File };

//POST CONTROLLERS (ADMIN)
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { instaURL, eventName, year, date }: EventType = req.body;

    const newEvent = await EventsList.create({
      insta_url: instaURL,
      event_name: eventName,
      year,
      date,
    });

    if (!newEvent) {
      return res.status(400).json({
        message: "Failed to save event",
        success: false
      })
    }

    await redis.del(redisKey.eventKey);

    return res.status(201).json({
      message: "Event saved successfully.",
      success: true,
      id: newEvent._id
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save event",
      success: false
    })
  }
}

export const addAlmanac = async (req: Request, res: Response) => {
  try {
    const { username, department } = req.body;
    const photo = (req as MulterRequest).file?.path;
    const publicId = (req as MulterRequest).file?.filename;

    if (!photo) {
      return res.status(400).json({ success: false, message: "Photo file is required." });
    }

    const almanac = await AlmanacList.create({
      photo,
      public_id: publicId,
      username,
      department,
    });

    if (!almanac) {
      return res.status(400).json({
        message: "Failed to save almanac entry",
        success: false
      })
    }

    await redis.del(redisKey.almanacKey);

    return res.status(201).json({
      message: "Almanac entry saved successfully.",
      success: true,
      id: almanac._id
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save almanac entry",
      success: false
    })
  }
}

export const addHomepageBanner = async (req: Request, res: Response) => {
  try {
    const { eventName, eventContent, eventFormLink } = req.body;
    const eventPoster = (req as MulterRequest).file?.path;
    const publicId = (req as MulterRequest).file?.filename;

    if (!eventPoster) {
      return res.status(400).json({ success: false, message: "Poster file is required." });
    }

    const homepageElement = await HomepageElementList.create({
      event_name: eventName,
      event_poster: eventPoster,
      event_poster_id: publicId,
      event_content: eventContent,
      event_form_link: eventFormLink,
    });

    if (!homepageElement) {
      return res.status(400).json({
        message: "Failed to save homepage element",
        success: false
      })
    }

    await redis.del(redisKey.homepageElementKey);

    return res.status(201).json({
      message: "Homepage element saved successfully.",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save homepage element",
      success: false
    })
  }
}

// UPDATE CONTROLLERS (ADMIN)
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const data = req.body;

    const updatedData = await EventsList.findByIdAndUpdate({ _id: id }, data, { runValidators: true });

    if (!updatedData) {
      return res.status(400).json({
        success: true,
        message: "can't update, try again later"
      });
    }

    await redis.del(redisKey.eventKey);

    return res.status(200).json({
      success: true,
      message: "update successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "can't update, try again later",
      success: false
    })
  }
}

export const updateAlmanac = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const data = req.body;

    const updatedData = await AlmanacList.findByIdAndUpdate({ _id: id }, data, { runValidators: true });

    if (!updatedData) {
      return res.status(400).json({
        success: true,
        message: "can't update, try again later"
      });
    }

    await redis.del(redisKey.almanacKey);

    return res.status(200).json({
      success: true,
      message: "update successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "can't update, try again later",
      success: false
    })
  }
}

//GET CONTROLLERS (ADMIN)
export const getEvents = async (req: Request, res: Response) => {
  try {
    // IF NOT IN CACHE(REDIS) FETCH FROM DB
    const data = await EventsList.find();

    // RETURN [] ARRAY IF NOTHING EXIST
    if (data.length === 0) {
      return res.status(200).json({
        message: "No events found",
        success: true,
        data: []
      });
    }

    return res.status(200).json({
      message: "fetch successfully",
      success: true,
      data
    })

  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      data: null
    })
  }
}

export const getAlmanac = async (req: Request, res: Response) => {
  try {
    // GET ALL ALMANAC DATA FROM DB
    const data = await AlmanacList.find();

    if (data.length === 0) {
      return res.status(200).json({
        message: "NO Almanac Found",
        success: true,
        data: []
      })
    }

    return res.status(200).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const getHomepageElement = async (req: Request, res: Response) => {
  try {
    const data = await HomepageElementList.find();

    if (data.length === 0) {
      return res.status(200).json({
        message: "No Element Found",
        success: true,
        data: []
      })
    }

    return res.status(200).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const getContactFormData = async (req: Request, res: Response) => {
  try {
    const data = await Contact.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const getPhotography = async (req: Request, res: Response) => {
  try {
    const data = await Photos.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const getPoem = async (req: Request, res: Response) => {
  try {
    const data = await Poems.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}

export const getArtwork = async (req: Request, res: Response) => {
  try {
    const data = await Artwork.find();

    if (!data) {
      return res.status(400).json({
        message: "not fetch",
        success: false
      })
    }

    return res.status(201).json({
      message: "fetch successfully",
      success: true,
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false
    })
  }
}


//DELETE CONTROLLERS (ADMIN)
export const deleteHomepageElement = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const deletedItem = await HomepageElementList.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "not found"
      });
    }

    redis.del(redisKey.homepageElementKey);

    return res.status(200).json({
      message: "Deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Failed to delete`, error: error.message });
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const deletedItem = await EventsList.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "not found"
      });
    }

    redis.del(redisKey.eventKey);

    return res.status(200).json({
      message: "Deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Failed to delete`, error: error.message });
  }
}

export const deleteAlmanac = async (req: Request, res: Response) =>{
  try {
    const { id } = req.query;

    const deletedItem = await HomepageElementList.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "not found"
      });
    }

    redis.del(redisKey.almanacKey);

    return res.status(200).json({
      message: "Deleted successfully"
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Failed to delete`, error: error.message });
  }
}