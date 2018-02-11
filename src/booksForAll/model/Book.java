package booksForAll.model;

import java.util.List;

public class Book {
	private String name;
	private String author;
	private String url;
	private String photo;
	private int price;
	private String description;
	private List<String> likeUsernames;
	private List<Comment> comments;
	
	public Book(String name, String author, String url, String photo, int price, String description, 
			List<String> likeUsernames, List<Comment> comments) {
		this.name = name;
		this.author = author;
		this.url = url;
		this.photo = photo;
		this.description = description;
		this.price = price;
		this.likeUsernames = likeUsernames;
		this.comments = comments;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getLikeUsernames() {
		return likeUsernames;
	}

	public void setLikeUsernames(List<String> likeUsernames) {
		this.likeUsernames = likeUsernames;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

}
