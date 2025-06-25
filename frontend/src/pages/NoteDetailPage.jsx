import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const NoteDetailPage = () => {
	const [note, setNote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get(`notes/${id}`);
				setNote(res.data);
			} catch (error) {
				if (error.response.status === 429) {
					toast.error("Slow Down! You're fetching notes too fast.", {
						duration: 4000,
						icon: "🚨",
					});
					console.error("Rate limit exceeded:", error);
				} else {
					console.error("Error fetching note:", error);
					toast.error("Failed to fetch note.");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchNote();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this note?"))
			return;

		try {
			await api.delete(`/notes/${id}`);
			toast.success("Note deleted successfully!");
			navigate("/");
		} catch (error) {
			if (error.response?.status === 429) {
				toast.error("Slow Down! You're deleting notes too fast.", {
					duration: 4000,
					icon: "🚨",
				});
			} else {
				console.error("Error deleting note:", error);
				toast.error("Failed to delete note.");
			}
		}
	};
	const handleSave = async () => {
		if (!note.title.trim() && !note.content.trim()) {
			toast.error("Title and content cannot be empty.");
			return;
		} else if (!note.title.trim()) {
			toast.error("Title cannot be empty.");
			return;
		} else if (!note.content.trim()) {
			toast.error("Content cannot be empty.");
			return;
		}

		try {
			setSaving(true);
			await api.put(`/notes/${id}`, note);
			toast.success("Note updated successfully!");

			navigate("/");
		} catch (error) {
			if (error.response?.status === 429) {
				toast.error("Slow Down! You're saving notes too fast.", {
					duration: 4000,
					icon: "🚨",
				});
			} else {
				console.error("Error saving note:", error);
				toast.error("Failed to save note.");
			}
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to={"/"} className="btn btn-ghost">
							<ArrowLeftIcon className="size-5" />
							Back to Notes
						</Link>
						<button
							onClick={handleDelete}
							className="btn btn-error btn-outline">
							<Trash2Icon className="size-5" />
							Delete Note
						</button>
					</div>

					<div className="card bg-base-100">
						<div className="card-body">
							<div className="form-control mb-4">
								<label className="label">
									<span className="label-text">Title</span>
								</label>
								<input
									type="text"
									placeholder="Note Title"
									className="input input-bordered"
									value={note.title}
									onChange={(e) =>
										setNote((prev) => ({
											...prev,
											title: e.target.value,
										}))
									}
								/>
							</div>

							<div className="form-control mb-4">
								<label htmlFor="" className="label">
									<span className="label-text">Content</span>
								</label>
								<textarea
									placeholder="Write your note here..."
									value={note.content}
									className="textarea textarea-bordered h-32"
									onChange={(e) =>
										setNote((prev) => ({
											...prev,
											content: e.target.value,
										}))
									}></textarea>
							</div>

							<div className="card-actions justify-end">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={saving}
									onClick={handleSave}>
									{saving ? "Saving..." : "Save Changes"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
