import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get()
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id', new ParseUUIDPipe({errorHttpStatusCode: HttpStatus.BAD_REQUEST})) id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseUUIDPipe) id: string, @Body('status') status: BoardStatus): Board {
        return this.boardsService.updateBoardStatus(id, status);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteBoard(@Param('id', ParseUUIDPipe) id: string): void {
        this.boardsService.deleteBoard(id);
    }
}
