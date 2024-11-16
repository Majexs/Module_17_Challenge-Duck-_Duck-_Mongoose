import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

// Get all Thoughts
export const getAllThoughts = async (_req: Request, res: Response ) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a single Thought
export const getThoughtById = async (_req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({_id: _req.params.thoughtId })
            .select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Create a new Thought
export const createThought = async (req: Request, res: Response ) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a Thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!'});
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Delete a Thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID '});
        }

        res.json({ message: 'Thought deleted!' })
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Add a Reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Delete a Reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}