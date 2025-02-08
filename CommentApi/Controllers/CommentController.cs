using Microsoft.AspNetCore.Mvc;
using CommentApi.Common;
using CommentApi.Dtos;
using CommentApi.Services;
using System.Threading.Tasks;
using System.Security.Claims;
using CommentApi.Models;

namespace CommentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment([FromBody] ReqCreateCommentDto commentDto)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(ApiResponse<object>.Fail("User not authenticated"));
            }

            int userId = int.Parse(userIdClaim.Value);
            commentDto.UserId = userId; 

            var createdComment = await _commentService.CreateCommentAsync(commentDto);
            var response = ApiResponse<ResGetCommentByIdDto>.Ok(createdComment, "Comment created successfully.");
            return CreatedAtAction(nameof(GetCommentById), new { id = createdComment.Id }, response);
        }
        catch (Exception ex)
        {
            var errorResponse = ApiResponse<object>.Fail("Failed to create comment.", new List<string> { ex.Message });
            return StatusCode(500, errorResponse);
        }
    }

    [HttpGet]
    public async Task<IActionResult>  GetAllComent()
    {

            var comments = await _commentService.GetAllComment();

            if (comments == null)
            {
                var notFoundResponse = ApiResponse<object>.Fail("Comment not found.");
                return NotFound(notFoundResponse);
            }


            var response = ApiResponse<List<ResGetCommentsByUserDto>>.Ok(comments, "Comments retrieved successfully.");
            return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCommentById(int id)
    {
        try
        {
            var comment = await _commentService.GetCommentByIdAsync(id);

            if (comment == null)
            {
                var notFoundResponse = ApiResponse<object>.Fail("Comment not found.");
                return NotFound(notFoundResponse);
            }

            var response = ApiResponse<ResGetCommentByIdDto>.Ok(comment, "Comment retrieved successfully.");
            return Ok(response);
        }
        catch (Exception ex)
        {
            var errorResponse = ApiResponse<object>.Fail("Failed to retrieve comment.", new List<string> { ex.Message });
            return StatusCode(500, errorResponse);
        }
    }
    [HttpGet("user")]
    public async Task<IActionResult> GetCommentsByUser()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized(ApiResponse<object>.Fail("User not authenticated"));
            }

            int userId = int.Parse(userIdClaim.Value);

            var comments = await _commentService.GetAllCommentByUserAsync(userId);

            if (comments == null || comments.Count == 0)
            {
                return NotFound(ApiResponse<object>.Fail("No comments found for this user."));
            }

            var response = ApiResponse<List<ResGetCommentsByUserDto>>.Ok(comments, "Comments retrieved successfully.");
            return Ok(response);
        }
        catch (Exception ex)
        {
            var errorResponse = ApiResponse<object>.Fail("Failed to retrieve comments.", new List<string> { ex.Message });
            return StatusCode(500, errorResponse);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateComment(int id, ReqUpdateCommentDto request)
    {
        try
        {
            
        var updatedUser = await _commentService.UpdateCommentAsync(id,request);

        return updatedUser == null 
            ? NotFound(ApiResponse<ResGetCommentByIdDto>.Fail($"Comment with ID {id} not found"))
            : Ok(ApiResponse<ResGetCommentByIdDto>.Ok(updatedUser, "comment updated successfully"));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<User>.Fail("Failed to update comment", new List<string> { ex.Message }));
        }
        catch (Exception)
        {
            return StatusCode(500, ApiResponse<User>.Fail("An error occurred while updating the comment"));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteComment(int id)
    {
        try
        {
            
        var updatedUser = await _commentService.DeleteCommentAsync(id);

        return Ok(ApiResponse<bool>.Ok(updatedUser, "comment Delete successfully"));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ApiResponse<User>.Fail("Failed to delete comment", new List<string> { ex.Message }));
        }
        catch (Exception)
        {
            return StatusCode(500, ApiResponse<User>.Fail("An error occurred while deleting the comment"));
        }
    }


}