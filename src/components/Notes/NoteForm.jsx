import React, { useState } from 'react';
import { sendRequest } from '../../utils/HttpRequest';
import { useLoaderData, useNavigate } from 'react-router-dom';
import getAbsolutePathUrl from '../../utils/URLManager';
import { Form, FormGroup, Button } from 'react-bootstrap';

const NoteForm = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const { categories, tags } = loaderData;
    let { noteDetails } = loaderData;
    if (!noteDetails) {
        noteDetails = {
            title: '',
            content: '',
            tags: [],
            categories: [],
        };
    }

    const [title, setTitle] = useState(noteDetails.title);
    const [content, setContent] = useState(noteDetails.content);
    const [selectedTags, setSelectedTags] = useState(noteDetails.tags.map(tag => tag.id));
    const [selectedCategories, setSelectedCategories] = useState(noteDetails.categories.map(category => category.id));
    const archived = noteDetails.archived || false;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = {
            title,
            content,
            tags: selectedTags,
            categories: selectedCategories
        };
        let httpMethod = 'POST';
        let url = '/notes/';
        if (noteDetails.id) {
            httpMethod = 'PUT';
            url += noteDetails.id + '/';
        }
        await sendRequest(httpMethod, url, note);
        navigate(getAbsolutePathUrl(archived ? 'notes/archived/' : 'notes/'));
    };


    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card p-4" style={{ width: '500px' }}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        {/* <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /> */}
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            aria-describedby="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="content">Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="content"
                            aria-describedby="content title"
                            value={content}
                            onChange={(e) => setContent(e.target.value)} 
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="tags">Tags</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            id="tags"
                            aria-describedby="tags"
                            value={selectedTags}                             
                            onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}>
                                {tags && tags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Text>
                            {selectedTags.map(selectedTagId => {
                                const tag = tags.find(tag => tag.id === selectedTagId);
                                return (
                                    <span key={tag.id} className="badge bg-secondary me-2">{tag.name}</span>
                                );
                            })}
                        </Form.Text>
                    </FormGroup>

                     
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="categories">Categories</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            id="categories"
                            aria-describedby="categories"
                            value={selectedCategories}                             
                            onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}>
                                {categories && categories.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                        </Form.Control>
                        <Form.Text>
                            {selectedCategories.map(selectedCategoryId => {
                                const category = categories.find(category => category.id === selectedCategoryId);
                                return (
                                    <span key={category.id} className="badge bg-secondary me-2">{category.name}</span>
                                );
                            })}
                        </Form.Text>
                    </FormGroup>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </div>
        </div>
    );
};

export default NoteForm;

export const loadTagsAndCategories = async () => {
    const categories = await sendRequest('GET', '/categories/');
    const tags = await sendRequest('GET', '/tags/');
    return { categories, tags };
};

export const loadNote = async () => {
    return await sendRequest('GET', '/notes//');
};
export const loadNoteDetail = async ({ request, params }) => {
    const { categories, tags } = await loadTagsAndCategories();
    const noteDetails = await sendRequest('GET', `/notes/${params.noteId}/`);
    return { categories, tags, noteDetails };
};