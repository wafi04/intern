using System.ComponentModel.DataAnnotations;


namespace  CommentApi.Dtos
{
    public class ReqCreateCommentDto
    {
        [Required(ErrorMessage = "UserId is required.")]
    public int UserId { get; set; }

        [Required(ErrorMessage = "Content is required.")]
        [MaxLength(200, ErrorMessage = "Content cannot exceed 200 characters.")]
    public string Content { get; set; } = string.Empty;
    }

    public class ReqUpdateCommentDto
    {
        [Required(ErrorMessage = "Content is required.")]
        [MaxLength(200, ErrorMessage = "Content cannot exceed 200 characters.")]
        public string Content { get; set; } = string.Empty;
    }

    public class ResGetCommentByIdDto
    {
    public int Id { get; set; }

    [MaxLength(200)]
    public string Content { get; set; } = string.Empty;

    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
    }
    public class ResGetCommentsByUserDto
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

            public UserResponseDto? User { get; set; } // Add this property

    }
}

