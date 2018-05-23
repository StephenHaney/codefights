
-- https://codefights.com/challenge/xwv7euMmeGRWxT77m/solutions/jEvDje9fLRLxjkqFR

-- welp, this was interesting! I haven't written much SQL in the past 5 years
-- and I'm definitely rusty. I'm sure there's a better way to accomplish this,
-- but this answer certainly works and runs quickly enough. 
-- It was fun to dive back into SQL after moving towards the front-end the last
-- few years.

CREATE PROCEDURE playerStatistics()
BEGIN
	CREATE TEMPORARY TABLE null_counts (
    	col_name varchar(50),
        null_count int,
        sort_order int
    );
	
	INSERT INTO null_counts (col_name, null_count, sort_order)
	SELECT
		'pass',
		(SELECT count(player_name) FROM player_statistics WHERE pass IS NULL),
		0;

	INSERT INTO null_counts (col_name, null_count, sort_order)
	SELECT
		'run',
		(SELECT count(player_name) FROM player_statistics WHERE run IS NULL),
		1;

	INSERT INTO null_counts (col_name, null_count, sort_order)
	SELECT
		'catch',
		(SELECT count(player_name) FROM player_statistics WHERE catch IS NULL),
		2;

	SET @firstSort = (SELECT col_name FROM null_counts ORDER BY null_count, sort_order LIMIT 0,1);
	SET @secondSort = (SELECT col_name FROM null_counts ORDER BY null_count, sort_order LIMIT 1,1);
	SET @thirdSort = (SELECT col_name FROM null_counts ORDER BY null_count, sort_order LIMIT 2,1);

	SET @sort = CONCAT('ORDER BY ', @firstSort, ' DESC, ', @secondSort, ' DESC, ', @thirdSort, ' DESC');
	SET @query = CONCAT('SELECT * FROM player_statistics ', @sort, ', player_name ASC;');

	PREPARE answer FROM @query;
    EXECUTE answer;

	DROP TEMPORARY TABLE null_counts;
END