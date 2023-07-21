/*
 * @Author: tongtannan 13352424428@163.com
 * @Description:
 */
const { mock } = require('mockjs');

export default function handler(req, res) {
  res.status(200).json(
    mock({
      'list|1-10': [
        {
          'id|+1': 1,
          'name|3': 'a',
          'bool|1': true,
          'list|1-10': [
            {
              'id|+1': 1
            }
          ]
        }
      ]
    })
  );
}
